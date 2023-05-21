// import React from 'react'
import propTypes from 'prop-types'

const Image = ({ src, defaultImg, ...rest }) => {
    return <img {...rest} src={src ? (src.startsWith('https') ? src : `${import.meta.env.VITE_BACKEND_URL}/uploads/${src}`) : defaultImg} alt='' />
}

Image.propTypes = {
    src: propTypes.string,
    defaultImg: propTypes.node,
}

export default Image
