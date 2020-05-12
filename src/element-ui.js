import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Switch,
  Select,
  Option,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  Popover,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tag,
  Icon,
  Upload,
  Spinner,
  Badge,
  Card,
  Steps,
  Step,
  Aside,
  Timeline,
  TimelineItem,
  Image,
  Loading,
  MessageBox,
  Message,
  Notification,
  Drawer
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button);
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(Popover)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Spinner)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Aside)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Image)
Vue.use(Loading)
Vue.use(Drawer)
// 这里有个奇怪的bug,需要复值，要不然报is not defined
const MessageBox1 = MessageBox

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox1.confirm
Vue.prototype.$prompt = MessageBox1.prompt
