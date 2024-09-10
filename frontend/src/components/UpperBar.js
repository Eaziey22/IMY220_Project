import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/UpperBar.module.css';

export class UpperBar extends React.Component {
    render() {
        return (
                <div className={styles.upperBar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#ECF6F6' }}>
                    <div style={{ flex: 1 }}>
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />
                        <input type="text" placeholder="Search..." style={{ padding: '5px 10px', width: '70%' }} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                    </div>
                </div>
            );
    }
}