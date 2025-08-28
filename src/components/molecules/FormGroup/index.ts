import { CheckboxGroup } from './CheckboxGroup'
import { RadioGroup } from './RadioGroup'
import { SelectableGroup } from './SelectableGroup'
import { SelectGroup } from './SelectGroup'
import { SwitchGroup } from './SwitchGroup'
import { TextAreaGroup } from './TextAreaGroup'
import { TextGroup } from './TextGroup'

export const FormGroup = {
    Checkbox: CheckboxGroup,
    Radio: RadioGroup,
    Select: SelectGroup,
    Switch: SwitchGroup,
    Text: TextGroup,
    TextArea: TextAreaGroup,
    Selectable: SelectableGroup,
}
