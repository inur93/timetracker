import React, { Component } from 'react';
import {
    Input, InputGroup, InputGroupAddon, ButtonGroup, UncontrolledTooltip,
    Table, Button
} from "reactstrap";
import { decorate, computed, reaction, action, observable } from 'mobx';
import { observer, inject } from "mobx-react";
import { stores } from "../common/config";
import { format, getDay, getDaysInMonth, isSameDay, differenceInDays, isToday } from "date-fns";
import daLocale from "date-fns/locale/da";
import { CreateTimeRegistration } from '../components/TimeRegistration/TimeRegistration';
import TimeRegistrationRow from '../components/TimeRegistration/TimeRegistrationRow';
import { IconPrevious, IconToday, IconNext, IconEverything } from '../components/shared/Icons';
import Spinner from '../components/shared/Spinner/Spinner';
import Page from './Page';
import { D } from '../App';

class TimeOverview extends Component {

    uiStore;

    constructor(props) {
        super(props);
        this.uiStore = new TimeOverviewUiStore(props.timeRegistrationStore, props.localizationStore);
    }

    componentDidMount() {
        this.props.timeRegistrationStore.loadTimeRegistrations();
    }

    render() {

        const { navigateToday, navigateNext, navigatePrevious, changeViewType, viewTypes,
            includesToday, overviewTitle,
            getTimeRegistrationByDate, intervalViewType, getTotal, showCreateModal } = this.uiStore;
        const { loading, createTimeRegistration, isSaving, query, setQuery, searchEverything, toggleSearchEverything } = this.props.timeRegistrationStore;

        return (
            <Page title="Time overview">
                {showCreateModal && <CreateTimeRegistration
                    isLoading={isSaving}
                    onClose={() => this.uiStore.showCreateModal = false}
                    onSubmit={createTimeRegistration} />}
                <div className="button-row">
                    <InputGroup className="search-button">
                        <InputGroupAddon addonType="prepend">
                            <Button id="btn-search-everything" outline color="primary" active={searchEverything} onClick={toggleSearchEverything}>
                                <IconEverything />
                            </Button>
                            <UncontrolledTooltip placement="left" target="btn-search-everything">
                                {D('Check this if you want to search all time registrations')}
                            </UncontrolledTooltip>
                        </InputGroupAddon>
                        <Input id="search-time-registrations" type="search" name="search" placeholder="Search comments" onChange={e => setQuery(e.target.value)} />
                    </InputGroup>
                    <ButtonGroup className="float-right">
                        <Button color="primary" onClick={() => this.uiStore.showCreateModal = true}>{D('Register time')}</Button>
                    </ButtonGroup>
                </div>
                <div className="button-row">
                    <ButtonGroup>
                        <Button outline color="primary" onClick={navigatePrevious}>
                            <IconPrevious />
                        </Button>
                        <Button id="navigate-today" outline color="primary" disabled={includesToday} onClick={navigateToday}>
                            <IconToday />
                        </Button>
                        <UncontrolledTooltip placement="top" target="navigate-today" delay={1000}>
                            {D('Navigate to today')}
                        </UncontrolledTooltip>
                        <Button outline color="primary" onClick={navigateNext}>
                            <IconNext />
                        </Button>
                    </ButtonGroup>
                    <div>
                        {overviewTitle}
                        {loading && <Spinner />}
                    </div>
                    <ButtonGroup className="float-right">
                        {viewTypes.map(v =>
                            <Button key={v} outline color="primary" onClick={() => changeViewType(v)} active={intervalViewType === v} >
                                {v}
                            </Button>)}
                    </ButtonGroup>
                </div>
                <div className="time-overview-table">
                    <Table striped responsive hover>
                        <colgroup>
                            <col width="150" />
                            <col width={50} />
                            <col width="auto" />
                        </colgroup>

                        <thead>
                            <tr>
                                <th>{D('Date')}</th>
                                <th>{D('hours')}</th>
                                <th>{D('comments')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>{getTotal}</td>
                                <td></td>
                            </tr>
                            {this.uiStore.dates.map(date => {
                                const timeRegistration = getTimeRegistrationByDate(date);
                                const { timeRegistered, comments } = (timeRegistration || {});
                                return <TimeRegistrationRow key={date} date={date} hours={timeRegistered} comments={comments} fromQuery={!!query} />
                            })}
                        </tbody>
                    </Table>
                </div>
            </Page>
        )
    }
}
export default inject(stores.timeRegistrationStore, stores.localizationStore)(observer(TimeOverview));

class TimeOverviewUiStore {

    viewTypes = ['week', 'month'];
    intervalViewType = localStorage.getItem('viewtype') || 'week';

    showCreateModal = false;
    store;
    localeStore;
    constructor(timeRegistrationStore, localizationStore) {
        this.store = timeRegistrationStore;
        this.localeStore = localizationStore;

        reaction(() => this.intervalViewType, viewType => {
            localStorage.setItem('viewtype', viewType);
            this.updateInterval(null, viewType)
        });
        reaction(() => this.store.isSaving, isSaving => {
            if (!isSaving) {
                //TODO check if any errors
                this.showCreateModal = false;
            }
        });
        const viewType = localStorage.getItem('viewtype') || 'week';
        this.updateInterval(new Date(localStorage.getItem('from-date') || new Date()), viewType);
    }

    get includesToday() {
        return !!this.dates.find(d => isToday(d));
    }

    get overviewTitle() {
        let from = format(this.store.from, "MMMM YYYY", { locale: this.localeStore.currentLocale });
        let to = format(this.store.to, "MMMM YYYY", { locale: this.localeStore.currentLocale });
        return to === from ? from : `${from} - ${to}`;
    }

    changeViewType = (viewType) => {
        this.intervalViewType = viewType;
    }
    navigateToday = () => {
        this.updateInterval(new Date(), this.intervalViewType);
    }
    navigateNext = () => {
        let date = new Date(this.store.from);
        let dayInMonth = date.getDate();
        switch (this.intervalViewType) {
            case 'week':
                date.setDate(dayInMonth + 7);
                break;
            case 'month':
            default:
                date.setMonth(date.getMonth() + 1);
        }
        this.updateInterval(date, this.intervalViewType);
    }

    navigatePrevious = () => {
        let date = new Date(this.store.from);
        let dayInMonth = date.getDate();
        switch (this.intervalViewType) {
            case 'week':
                date.setDate(dayInMonth - 6);
                break;
            case 'month':
            default:
                date.setMonth(date.getMonth() - 1);
        }
        this.updateInterval(date, this.intervalViewType);
    }

    updateInterval = (from, viewType) => {
        const view = viewType || this.intervalViewType;
        if (!from) {
            from = this.store.from;
        }
        if (!from || isNaN(from.getTime())) {
            from = new Date();
        }
        from.setHours(0, 0, 0, 0);
        localStorage.setItem('from-date', from);
        let to = null;

        switch (view) {
            case 'week':
                from.setDate(from.getDate() - getDay(from));
                to = new Date(from);
                to.setDate(to.getDate() + 6);
                break;
            case 'month':
            default:
                from.setDate(1);
                to = new Date(from);
                to.setDate(getDaysInMonth(from));
        }
        this.store.from = from;
        this.store.to = to;
        this.store.loadTimeRegistrations();
    }

    getTimeRegistrationByDate = (date) => {
        const registrations = this.timeRegistrations;
        return registrations.find(r => isSameDay(r.date, date));
    }

    //each element corresponds to a row in the time overview table
    get dates() {
        const { from, to, query, timeRegistrations } = this.store;
        let dates = [];
        if (query) {
            dates = [...new Set(timeRegistrations.map(r => r.date))].sort((a, b) => a < b);
        } else {
            let days = differenceInDays(to, from) + 1;
            for (let i = 0; i < days; i++) {
                let date = new Date(from);
                date.setDate(date.getDate() + i);
                dates.push(date);
            }
        }
        return dates;
    }

    get getTotal() {
        let total = 0;
        this.store.timeRegistrations.forEach(t => total += t.timeRegistered);
        return total;
    }

    get timeRegistrations() {
        let grouped = {};
        const list = this.store.timeRegistrations;
        list.forEach(el => {
            let group = grouped[el.date];
            if (!group) {
                group = {
                    date: el.date,
                    timeRegistered: el.timeRegistered,
                    comments: el.comment ? [el.comment] : []
                }
            } else {
                group.timeRegistered += el.timeRegistered;
                if (el.comment) {
                    group.comments.push(el.comment);
                }
            }
            grouped[el.date] = group;
        })
        return Object.values(grouped).sort((a, b) => a.date < b.date);
    }
}

decorate(TimeOverviewUiStore, {
    timeRegistrations: computed,
    dates: computed,
    includesToday: computed,
    overviewTitle: computed,
    intervalViewType: observable,
    showCreateModal: observable,
    changeViewType: action,
    navigateToday: action,
    navigateNext: action,
    navigatePrevious: action,
    updateInterval: action
})