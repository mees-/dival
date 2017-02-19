import Template from '../Template'

export default (template, data) => (
  new Template(template).validate(data)
)
