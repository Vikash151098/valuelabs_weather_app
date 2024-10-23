import React from 'react'
import styles from './alert.module.css'

const Alert = ({ text, children }) => {
    return (
        <div className={styles['alert']}>{text || children}</div>
    )
}

export default Alert