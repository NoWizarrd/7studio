import styles from './App.module.scss'
import Header from './components/header/Header'
import { Sidebar } from './components/sidebar/Sidebar'

function App() {

  return (
    <>
      <Header/>
      <div className={styles.contentWrapper}>
        <Sidebar/>
        <main className={styles.main}>
          main
        </main>
      </div>
    </>
  )
}

export default App
