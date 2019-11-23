import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export default function (props) {
    const {pageSize, page, count, onChange} = props;
    
    const isFirst = page === 0;
    const isLast = (page+1) * pageSize >= count;
    const pages = Math.ceil(count/pageSize);

    let pageList = [];
    for(let i = 0; i < pages; i++){
        pageList.push(i);
    }

    const handleClick = (p) => (e) => {
        e.preventDefault();
        onChange(p);
    }

    return (
        <Pagination>
            <PaginationItem disabled={isFirst} onClick={handleClick(0)}>
                <PaginationLink first />
            </PaginationItem>
            <PaginationItem disabled={isFirst} onClick={handleClick(isFirst ? 0 : page-1)}>
                <PaginationLink previous/>
            </PaginationItem>
            {
                pageList.map(p => <PaginationItem key={'pagination-'+p} active={p === page} onClick={handleClick(p)}>
                    <PaginationLink >
                        {p+1}
                    </PaginationLink>
                </PaginationItem>)
            }
            <PaginationItem disabled={isLast} onClick={handleClick(isLast ? page : page+1)}>
                <PaginationLink next />
            </PaginationItem>
            <PaginationItem disabled={isLast} onClick={handleClick(pages-1)}>
                <PaginationLink last/>
            </PaginationItem>
        </Pagination>
    )
};