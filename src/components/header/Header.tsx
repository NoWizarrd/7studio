import styles from './Header.module.scss'
import MenuIcon from '../../assets/icon.png'
import NavBackIcon from '../../assets/NavBack.png'

export default function Header() {
  return (
    <header className={styles.header}>
        <img src={MenuIcon} alt='MenuIcon' className={styles.headerIcon}/>
        <img src={NavBackIcon} alt='NavBackIcon' className={styles.headerIcon}/>
        <div className={styles.headerBtn}>Просмотр</div>
        <div className={styles.headerBtn}>Управление</div>
    </header>
  )
}
