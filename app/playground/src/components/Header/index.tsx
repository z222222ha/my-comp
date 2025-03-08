import { DownloadOutlined, MoonOutlined, ShareAltOutlined, SunOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import logo from './logo.svg'
import copy from 'copy-to-clipboard'
import { message } from 'antd'
import { downloadFiles } from '../../ReactPlayground/utils'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import { useContext } from 'react'

export default function Header() {
  const { files, theme, setTheme } = useContext(PlaygroundContext)
  const handleShare = () => {
    copy(window.location.href)
    message.success('分享链接已复制。')
  }

  const handleDownload = () => {
    downloadFiles(files)
    message.success('下载完成')
  }

  const switchToDarkTheme = () => {
    setTheme('dark')
  }

  const switchToLightTheme = () => {
    setTheme('light')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <img
            src={logo}
            className={styles.logo}
            alt="logo"
          />
          <span className={styles.title}>React Playground</span>
        </div>

        <div className={styles.actions}>
          {theme === 'light' ? (
            <MoonOutlined
              className={styles.icon}
              title="切换暗色主题"
              onClick={switchToDarkTheme}
            />
          ) : (
            <SunOutlined
              className={styles.icon}
              title="切换亮色主题"
              onClick={switchToLightTheme}
            />
          )}
          <ShareAltOutlined
            className={styles.icon}
            onClick={handleShare}
            title="分享"
          />
          <DownloadOutlined
            className={styles.icon}
            onClick={handleDownload}
            title="下载"
          />
        </div>
      </div>
    </header>
  )
}
