//Server Home Page
export const CREATEDB_TITLE = "New Database"
export const DBLIST_TITLE  = "My Databases"
export const CREATE_FIRSTDB_CSS = "color-primary alert"
export const CREATE_FIRSTDB = ""
export const DBLIST_HEADER_CSS = "some-old-header-css"


//Terminus DB Home Page
export const TERMINUS_HOME_TITLE = "TerminusDB - Terminus Database"
export const TERMINUS_HOME_ADVICE = "This is the TerminusDB Terminus Database. It stores the internal meta-data about users, roles, databases, etc. It should not be updated directly - treat with care."


//Document Page Level Error Messages
export const DOCUMENT_NO_SCHEMA = { 
    id: "DOCUMENT_NO_SCHEMA",
    color: "info",
    title: "Missing Schema Graph",
    message: "There is no schema defined for this database - before you can define and use documents, you need to create a schema for this database"    
}

export const SYSTEM_ERROR = { 
    id: "SYSTEM_ERROR",
    title: "System Error",
    color: "error",
    message: "Failed to load documents from database"    
}

export const NO_DOCUMENT = { 
    id: "NO_DOCUMENT",
    title: "Empty Database",
    color: "info",
    message: "No documents have been added to this database yet. "    
}

export const NO_DOCUMENT_CLASS = { 
    id: "NO_DOCUMENT_CLASS",
    title: "Missing Document Class",
    color: "info",
    message: "No document classes have been defined in the schema. Before you can view and create documents, you must define at least one document class in the database schema. "    
}

export const GRAPHS_LOAD_ERROR = { 
    id: "GRAPHS_LOAD_ERROR",
    color: "danger",
    title: "Failed to load graphs",
    message: "An error occurred while loading the list of database graphs"    
}


/* database home tabs */
export const DETAILS_TAB = 'Monitor'
export const COLLABORATE_TAB = 'Collaborate'
export const MANAGE_TAB = 'Manage'

/* schema tabs */
export const CLASSES_TAB = "Classes"
export const PROPERTIES_TAB = "Properties"
export const OWL_TAB = "OWL"
export const GRAPHS_TAB = "Graphs"
export const PREFIXES_TAB = "URL Prefixes"

export const SERVER_HOME_PAGE = {
    page: '/',
    label: 'Home'
}

export const PROFILE_PAGE = {
    page: '/profile',
    label: 'Profile'
}

export const NEW_DB_PAGE = {
    page: '/newDB',
    label: 'New Database'
}

export const NEW_TEAM_PAGE = {
    page: '/newTeam',
    label: 'New Team'
}

export const DOWNLOAD_PAGE = {
    page: '/download',
    label: 'DOWNLOAD TERMINUSDB'
}

export const DB_HOME_PAGE = {
    page: '/db/*',
    label: "DB Home"
}

export const SCHEMA_PAGE = {
    page: '/schema',
    label: 'Schema'
}

export const DOCUMENT_PAGE = {
    page: '/document',
    label: 'Document'
}

export const QUERY_PAGE = {
    page: '/query',
    label: 'Query'
}

export const LOGOUT = {
    page: '/logout',
    label: 'Logout'
}

export const LOGIN = {
    label: 'Login'
}

// library queries
export const SHOW_ALL_SCHEMA_ELEMENTS = 'Show All Schema Elements'
export const SHOW_ALL_CLASSES = 'Show All Classes'
export const SHOW_DOCUMENT_CLASSES = 'Show Document Classes'
export const SHOW_ALL_PROPERTIES = 'Show All Properties'

// commit queries
export const GET_COMMITS = 'GET_COMMITS'



//Query Page
export const NEW_QUERY_BUTTON_CSS = "btn btn-secondary secondary lead mt-4 formMrg"
export const NEW_QUERY_BUTTON_TEXT = "Add New Query Pane"
export const QUERY_BOX_CSS = "query-box"
export const NEW_QUERY_ROW_CSS = ""

//Profile Page 
export const PROFILE_BG_IMAGE = "https://terminusdb.com/img/placeholders/half-background-mobile.png"
export const USER_CARD_CSS = "user-card"
export const USER_DESCRIPTION_FILLER = "..." 
export const PROFILE_TITLE = "Profile"
export const PROFILE_CONTENT_CSS = "some-css"


//Login Page
export const LOGIN_LOGO = "https://terminusdb.com/img/logos/logo.svg"
export const LOGIN_LOGO_CSS = "mb-4"
export const LOGIN_PLACEHOLDER = "Enter valid TerminusDB password"
export const LOGIN_PROMPT = "Please enter your password"
export const CONNECT_PROMPT = "Connect"
export const LOGIN_PROMPT_CSS = "mb-4 mt-4"
export const LOGIN_FORM_CSS = "formSignin"
export const LOGIN_CONTAINER_CSS = "h-100 containerSignIn"
export const LOGIN_BUTTON_CSS ="btn btn-lg btn-block btn btn-primary"