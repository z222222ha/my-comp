import { CSSProperties, MouseEventHandler, PropsWithChildren } from 'react'
import Styles from './index.module.scss'
import cs from 'classnames'

export interface ButtonProps extends PropsWithChildren {
  className?: string
  style?: CSSProperties
  type?: 'primary' | 'default'
  onClick?: MouseEventHandler
}

function Button(props: ButtonProps) {
  const { className = '', style, type = 'primary', children, onClick = () => {} } = props

  return (
    <div
      className={cs(Styles.btn, className, Styles[`btn-${type}`])}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Button
