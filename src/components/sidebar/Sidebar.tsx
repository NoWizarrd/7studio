import NestedList from '../NestedList/NestedList'
import styles from './Sidebar.module.scss'

export function Sidebar() {
    return(
        <aside className={styles.sidebar}>
            <NestedList/>
        </aside>
    )
}

