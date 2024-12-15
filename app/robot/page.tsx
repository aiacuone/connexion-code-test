import { RobotPage } from './robotPage'

// Todo:
// Make sure you don't need Toast or Popover anymore. If not remove them
// Look at why imports arent working using index.ts

//trade offs:
//- Having the state be in the context makes it easier to manage the state across the app. However, it can be harder to debug and understand the state of the app and also makes the app less efficient
// - Could not add state to this area because having state change this high would mean the context would re-render and would cause errors

export default RobotPage
