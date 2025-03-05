import styles from './App.module.scss'
import Header from './components/header/Header'
import { Sidebar } from './components/sidebar/Sidebar'
import Table from './components/Table/TableComponent'

function App() {

  return (
    <>
      <Header/>
      <div className={styles.contentWrapper}>
        <Sidebar/>
        <Table/>
      </div>
    </>
  )
}

export default App
