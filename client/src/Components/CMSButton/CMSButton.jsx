import "./CMSButton.css";
import PropTypes from 'prop-types';


const STYLE=["save","edit","delete"];
const SIZE=["small","medium","large"];

export const CMSButton=({children,type,styles,size,onClick})=>{

    const checkStyle= STYLE.includes(styles)?styles:"";
    const checkSize=SIZE.includes(size)?size:"";
    
    return (
        <button className={`${checkStyle} ${checkSize}`} type={type} onClick={onClick}>{children}</button>
    );

};

CMSButton.propTypes={
    children: PropTypes.any,
    styles: PropTypes.oneOf(STYLE),
    size:PropTypes.oneOf(SIZE),
    onClick:PropTypes.func
}

CMSButton.defaultProps={
    type : 'button'
}

