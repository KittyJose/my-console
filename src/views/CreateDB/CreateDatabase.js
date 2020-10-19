import React, {useState, useEffect} from 'react'
import 'react-tabs/style/react-tabs.css';
import Loading from '../../components/Reports/Loading'
import {WOQLClientObj} from '../../init/woql-client-instance'
import {
    TERMINUS_SUCCESS,
    TERMINUS_ERROR,
    TERMINUS_WARNING,
    TERMINUS_COMPONENT,
} from '../../constants/identifiers'
import { CREATE_DB_FORM, SHARE_DB_FORM, CREATE_REMOTE_INTRO, CREATE_LOCAL_INTRO, CREATE_DATABASE_LOCALLY, CREATE_DATABASE_HUB } from './constants.createdb'
import { goDBHome, goHubPage } from '../../components/Router/ConsoleRouter'
import { DBDetailsForm } from './DBDetails'
import {useAuth0} from '../../react-auth0-spa'
import { CreateLocal, CreateRemote, ShareLocal } from '../../components/Query/CollaborateAPI'
import { Row, Col } from "reactstrap"
import { TerminusDBSpeaks } from '../../components/Reports/TerminusDBSpeaks'
import { DBCreateCard, DBShareHeader} from "./DBCreateCard"
import { AiOutlineCloseCircle, AiFillCiCircle } from 'react-icons/ai'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export const CreateDatabase = () => {

    const {woqlClient} = WOQLClientObj()

    if(!woqlClient) return null
    let u = woqlClient.user()
    let allow_remote = u.logged_in

    function toggleLocal(){
        setLocal(!local)
    }

    let local_text = "Create a new database on your local TerminusDB - only accessible locally"
    let remote_text = "Create a new database on Terminus Hub where you can share it with collaborators"

    const [local, setLocal] = useState(true)

    const handleLocal = () => {
        setLocal(true)
    }

    const handleHub = () => {
        setLocal(false)
    }
    return (
        <div className="tdb__loading__parent">

            <div className="create-section">
                <hr/>
                {allow_remote && <>
                    <div className="create-db-option-descr">Choose where you want to create your database</div>
                        <span className="create-db-span" onClick={handleLocal}>
                            <input type="radio" id={CREATE_DATABASE_LOCALLY}
                                name={CREATE_DATABASE_LOCALLY}
                                value={CREATE_DATABASE_LOCALLY}
                                checked={local}/>
                            <label className="create-db-options" htmlFor={CREATE_DATABASE_LOCALLY}>Local Database</label>
                            <img className="create-place-badge-hub-img" src="https://assets.terminusdb.com/terminusdb-console/images/create-locally-1.png" title="Terminus Hub Database"/>
                        </span>
                        <span className="create-db-span" onClick={handleHub}>
                            <input type="radio" id={CREATE_DATABASE_HUB}
                                name={CREATE_DATABASE_HUB}
                                value={CREATE_DATABASE_HUB}
                                checked={!local}/>
                            <label className="create-db-options" htmlFor={CREATE_DATABASE_HUB}>Terminus Hub Database</label>
                            <img className="create-place-badge-hub-img" src="https://assets.terminusdb.com/terminusdb-console/images/cowduck-space.png" title="Terminus Hub Database"/>
                        </span>
                </>}
            </div>

            {local &&
                <CreateLocalForm />
            }
            {!local &&
                <CreateRemoteForm />
            }
        </div>

    )
}


/*

<div className="create-db-items">
    <Tabs selectedTabClassName="create-db-tabs-selected">
        <TabList className="create-db-tabs">
          <Tab className="create-db-tabs-title">
            <span className="create-db-tabs-icon">
                <img className="create-place-badge-hub-img create-db-local-img" title="Terminus Local Database"/>
                {CREATE_DATABASE_LOCALLY}
            </span>
          </Tab>
          {allow_remote && <Tab className="create-db-tabs-title">
            <span className="create-db-tabs-icon">
                <img className="create-place-badge-hub-img create-db-local-hub" title="Terminus Hub Database"/>
                {CREATE_DATABASE_HUB}
            </span>
          </Tab>}
        </TabList>
        <TabPanel className="create-db-tabs-panel">
            <CreateLocalForm />
        </TabPanel>
        {allow_remote && <TabPanel className="create-db-tabs-panel">
          <CreateRemoteForm />
        </TabPanel>}
    </Tabs>
</div>


*/


export const CreateLocalForm = ({onCancel, from_local}) => {
    const [report, setReport] = useState()
    const [loading, setLoading] = useState(false)
    const {woqlClient, refreshDBRecord  } = WOQLClientObj()

    async function onCreate(doc){
        let update_start = Date.now()
        setLoading(true)
        update_start = update_start || Date.now()
        doc.organization = woqlClient.user_organization()
        return CreateLocal(doc, woqlClient)
        .then((local_id) => {
            after_create_db(update_start, get_local_create_message(doc.label, doc.id), local_id, "create", doc)
            if(doc.files) {
                woqlClient.insertCSV(doc.files, 'create database with csvs', null, null).then((results) => {
                    console.log('results', results)
                })
                .catch((err) => console.log('sdsd', err))
            }
        })
        .catch((err) => process_error(err, update_start, create_local_failure(doc.label, local_id)))
        .finally(() => setLoading(false))
    }

    function after_create_db(update_start, message, id, create_or_clone, remote_record, onShare){
        woqlClient.db(id)
        let rep = {
            status: TERMINUS_SUCCESS,
            message: message,
            time: Date.now() - update_start,
        }
        setReport(rep)
        refreshDBRecord(id, woqlClient.user_organization(), create_or_clone, remote_record)
        .then(() => goDBHome(id, woqlClient.user_organization(), report))
    }

    /*
    if(meta.files) {
        client.addCSV(null, null, meta.files, 'testing').then((results) => {
            console.log('results', results)
        })
    }
    */

    function get_local_create_message(label, id){
        return `${CREATE_DB_FORM.createSuccessMessage} ${label}, (id: ${id}) `
    }

    function create_local_failure(label, id){
        return`${CREATE_DB_FORM.createFailureMessage} ${label}, (id: ${id}) `
    }

    return  (<>
        {loading &&  <Loading type={TERMINUS_COMPONENT} />}
        <div className="pretty-form">
        {onCancel &&
            <div className="create-place-badge local-badge">
                <AiOutlineCloseCircle className="cancel-create-form" title="Cancel Database Create" onClick={onCancel}/>
                Creating Local Database
                <img className="create-place-badge-hub-img" src="https://assets.terminusdb.com/terminusdb-console/images/create-locally-1.png" title="Terminus Hub Database"/>
            </div>
        }
            <Row className="generic-message-holder">
                {report &&
                    <TerminusDBSpeaks report={report} />
                }
            </Row>
            <DBDetailsForm buttons={CREATE_DB_FORM.buttons} onSubmit={onCreate} logged_in={false} from_local={from_local} />
        </div>
    </>)
    /*return  (<>
        {loading &&  <Loading type={TERMINUS_COMPONENT} />}
        {onCancel &&
            <div className="create-place-badge local-badge">
                <AiOutlineCloseCircle className="cancel-create-form" title="Cancel Database Create" onClick={onCancel}/>
                Creating Local Database
                <img className="create-place-badge-hub-img" src="https://assets.terminusdb.com/terminusdb-console/images/create-locally-1.png" title="Terminus Hub Database"/>
            </div>
        }
            <Row className="generic-message-holder">
                {report &&
                    <TerminusDBSpeaks report={report} />
                }
            </Row>
            <DBDetailsForm buttons={CREATE_DB_FORM.buttons} onSubmit={onCreate} logged_in={false} from_local={from_local} />
    </>) */
}


export const CreateRemoteForm = ({onSubmit, onCancel}) => {
    const [report, setReport] = useState()
    const [loading, setLoading] = useState(false)
    const {woqlClient, remoteClient, bffClient, remoteEnriched, addClone } = WOQLClientObj()
    const { getTokenSilently } = useAuth0();
    if(!remoteEnriched) return null
    let u = bffClient.user()
    let org = u.organizations[0]
    let smeta = {
        id: "",
        label: "",
        comment: "",
        icon: "",
        schema: true,
        public: true,
    }
    for(var k in org){
        smeta[k] = org[k]
    }
    smeta.hub_url = remoteClient.server()

    async function createRemote(doc, update_start) {
        setLoading(true)
        if(!doc.organization) doc.organization = bffClient.user_organization()
        update_start = update_start || Date.now()
        doc.remote_url = remoteClient.server() + doc.organization + "/" + doc.id
        CreateRemote(doc, woqlClient, bffClient, getTokenSilently)
        .then((local_id) => {
            let rep = {status: TERMINUS_SUCCESS, message: "Successfully Created Remote"}
            setReport(rep)
            let newguy = {id: local_id, organization: woqlClient.user_organization(), label: doc.label || "", comment: doc.comment || ""}
            newguy.remote_url = doc.remote_url
            newguy.remote_record = doc
            addClone(local_id, woqlClient.user_organization(), newguy)
            .then(() => goDBHome(local_id, woqlClient.user_organization(), rep))
        })
        .catch((err) => process_error(err, update_start, create_remote_failure(doc.label, doc.id)))
        .finally(() => setLoading(false))
    }


    function create_remote_failure(label, id){
        return `${CREATE_DB_FORM.createRemoteFailureMessage} ${label}, (id: ${id}) `
    }

    return (
        <div className="pretty-form">
            {onCancel &&
                <div className="create-place-badge remote-badge">
                        <AiOutlineCloseCircle className="cancel-create-form" title="Cancel Database Create" onClick={onCancel}/>
                    Creating Terminus Hub Database
                    <img className="create-place-badge-hub-img" src="https://assets.terminusdb.com/terminusdb-console/images/cowduck-space.png" title="Terminus Hub Database"/>
                </div>
            }
            <Row className="generic-message-holder">
                {report &&
                    <TerminusDBSpeaks report={report} />
                }
            </Row>
            <Row>
                <DBCreateCard start={smeta} onSubmit={createRemote} organizations={u.organizations} databases={bffClient.databases()}  type="create" />
            </Row>
            {loading &&  <Loading type={TERMINUS_COMPONENT} />}
        </div>
    )
    /*<div className="pretty-form">*/
    /*return (

        <>
            {onCancel &&
                <div className="create-place-badge remote-badge">
                        <AiOutlineCloseCircle className="cancel-create-form" title="Cancel Database Create" onClick={onCancel}/>
                    Creating Terminus Hub Database
                    <img className="create-place-badge-hub-img" src="https://assets.terminusdb.com/terminusdb-console/images/cowduck-space.png" title="Terminus Hub Database"/>
                </div>
            }
            <Row className="generic-message-holder">
                {report &&
                    <TerminusDBSpeaks report={report} />
                }
            </Row>
            <Row>
                <DBCreateCard start={smeta} onSubmit={createRemote} organizations={u.organizations} databases={bffClient.databases()}  type="create" />
            </Row>
            {loading &&  <Loading type={TERMINUS_COMPONENT} />}
        </>
    )*/
}



export const ShareDBForm = ({onSuccess, starter}) => {
    const [report, setReport] = useState()
    const [loading, setLoading] = useState(false)

    const { getTokenSilently } = useAuth0()
    const {woqlClient, remoteClient, bffClient, remoteEnriched, addShare  } = WOQLClientObj()
    if(!remoteEnriched) return null
    let u = bffClient.user()
    let smeta = {}
    for(var k in starter){
        smeta[k] = starter[k]
    }
    smeta.hub_url = remoteClient.server()
    if(!smeta.icon) smeta.icon = ""
    let o = u.organizations[0]
    for(var k in o){
        smeta[k] = o[k]
    }
    smeta.public = true;

    async function shareLocal(doc, local, update_start) {
        delete(doc['remote_url'])
        setLoading(true)
        update_start = update_start || Date.now()
        if(!doc.organization) doc.organization = bffClient.user_organization()
        doc.remote_url = remoteClient.server() + doc.organization + "/" + doc.id
        let sclient = woqlClient.copy()
        if(local) {
            sclient.organization(local.organization)
            sclient.db(local.id)
        }
        let lid = sclient.db()
        ShareLocal(doc, sclient, bffClient, getTokenSilently)
        .then(() => {
            let rep = {status: TERMINUS_SUCCESS, message: "Successfully Pushed Database to TerminusHub"}
            setReport(rep)
            return addShare(lid, woqlClient.user_organization(), doc).then((dbrec) => {
                goHubPage(doc.organization, doc.id)
                if(onSuccess) onSuccess(doc)
            })
        })
        .catch((err) => process_error(err, update_start, "Push to TerminusHub failed"))
        .finally(() => setLoading(false))
    }

    function process_error(err, update_start, message){
        setReport({
            error: err,
            status: TERMINUS_ERROR,
            message: message,
            time: Date.now() - update_start,
        })
        console.log(err)
    }

    return (
        <div className="tdb__loading__parent">
            <Row className="remote-info share-on-hub-title">
                <DBShareHeader />
            </Row>
            <Row className="generic-message-holder">
                {report &&
                    <TerminusDBSpeaks report={report} />
                }
            </Row>
            {
                <DBCreateCard
                    start={smeta} onSubmit={shareLocal} organizations={u.organizations} databases={bffClient.databases()} type="share"/>
            }
            {loading &&  <Loading type={TERMINUS_COMPONENT} />}
        </div>
    )
}
