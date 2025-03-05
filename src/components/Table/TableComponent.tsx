import { StyledTable } from './Table'
import styles from './TableComponent.module.scss'

export default function Table() {
  return (
    <main className={styles.main}>
        <div className={styles.tableHeader}>
            <div>Строительно-монтажные работы</div>  
        </div>
        <div style={{height:'100%' , background: '#202124'}}>
          <StyledTable />
        </div>
    </main>
  )
}
