import InternalForm from './Form'
import Item from './Item'

type InternalFormType = typeof InternalForm

interface IForm extends InternalFormType {
  Item: typeof Item
}

const Form = InternalForm as IForm

Form.Item = Item

export default Form
