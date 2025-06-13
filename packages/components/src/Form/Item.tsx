import React, { useContext, useEffect, useState } from 'react'
import FormContext from './FormContext'
import Schema, { Rules } from 'async-validator'

export interface ItemProps {
  className?: string
  style?: React.CSSProperties
  label?: React.ReactNode
  name?: string
  valuePropName?: string
  rules?: Array<any>
  children?: React.ReactElement
}

const getValueFromEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value, type } = e.target
  console.log(e)
  if (type === 'checkbox') {
    return e.target.checked
  } else if (type === 'radio') {
    return e.target.value
  }
  return value
}

export default function Item(props: ItemProps) {
  const { name, children, rules, label } = props
  const { onValueChange, values, validateRegister } = useContext(FormContext)
  const [value, setValue] = useState(values[name] || '')
  const [error, setError] = useState('')

  if (!name) {
    return children
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { value } = e.target;
    const value = getValueFromEvent(e)
    console.log(value)
    setValue(value)
    onValueChange?.(name, value)
    handleValidate(value)
    console.log(values, value)
  }

  const handleValidate = (value: any) => {
    let errorMsg = null
    if (Array.isArray(rules) && rules.length > 0) {
      const validator = new Schema({
        [name]: rules.map((rule) => {
          return { type: 'string', ...rule }
        }),
      })

      validator.validate({ [name]: value }, (errors) => {
        if (errors) {
          errorMsg = errors[0].message
          setError(errorMsg)
        } else {
          setError('')
          errorMsg = null
        }
      })
    }

    return errorMsg
  }

  useEffect(() => {
    validateRegister(name, () => handleValidate(value))
  }, [value])

  const childElm = React.cloneElement(children, {
    value: value,
    onChange: handleChange,
  })

  return (
    <div>
      <div>{label && <label>{label}</label>}</div>
      {childElm}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
