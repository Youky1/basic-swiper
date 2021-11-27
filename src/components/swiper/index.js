import React, { useRef, useEffect, useState } from "react";
import style from './index.module.css';
import PropTypes from 'prop-types';
function Swiper(props) {
    const {
        width,
        height,
        list,
        pagination,
        handleDoubleClick,
    } = props;
    if(list.length === 0){
        console.warn("The length of list shouldn't be less than 1");
    }

    // 定义并设置总容器的宽度
    const [containerWidth, setContainerWidth] = useState();
    const containerRef = useRef();
    useEffect(() => {
        setContainerWidth(containerRef.current.offsetWidth );
    }, [list.length])

    // 当前显示图片的下标
    const [currentPage, setCurrentPage] = useState(0);
    let currentX = null;

    // 监听滑动
    const handleMouseDown = e => {
        currentX = e.clientX
    }
    const handleMouseUp = e => {
        const end = e.clientX;
        if( end - currentX > 20 && currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
        else if( currentX - end > 20 && currentPage < list.length-1) {
            setCurrentPage(currentPage + 1)
        }
    }

    // 设置wrapper的宽度为图片数量 * 父级元素宽度，并通过transform属性达到图片滚动效果
    const wrapperStyle = {
        width: `${list.length}00%`,
        transform: `translateX(-${containerWidth * currentPage}px)`
    }

    // 轮播图内容
    const swiperItems = list.map((item, index) => (
        <div 
            key={index}
            className={style.swiper_item}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onDoubleClick={() => handleDoubleClick(index)}
            style={{backgroundImage: `url(${item.url})`, width:containerWidth}}
        ></div>
    ))

    // 分页器点击响应函数
    const handlePaginationClick = index => {
        console.log(`${index} clicked`);
        setCurrentPage(index);
    }

    const paginationItemClass = (index) => {
        const isActive = index === currentPage ?  ' ' + style.pagination_active : '';
        return style.pagination_item + isActive;
    }

    // 底部分页器
    const paginationBar = (
        <div className={style.swiper_pagination}>
            {list.map((item, index) => 
                <div 
                    key={index}
                    className={paginationItemClass(index)}
                    onClick={() => handlePaginationClick(index)}
                ></div>
            )}
        </div>
    )

    return (
        <div className={style.swiper_container} ref={containerRef} style={{width,height}}>
            <div className={style.swiper_wrapper} style={wrapperStyle}>
                { swiperItems }
            </div>
            {pagination && paginationBar}
        </div>
    )
}

Swiper.propTypes = {
    // 数据列表,必填属性
    list: PropTypes.array.isRequired,

    // 总容器尺寸，默认为占满父容器
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    // 是否显示分页器
    pagination: PropTypes.bool,

    // 双击响应函数，接收下标N
    handleDoubleClick: PropTypes.func,
}

Swiper.defaultProps = {
    width: '100%',
    height: '100%',
    pagination: true,
    handleDoubleClick: function(){},
}
export default Swiper;