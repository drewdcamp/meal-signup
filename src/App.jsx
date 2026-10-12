import "./App.css";

import React from "react"
import { useParams } from "react-router";

import { GoogleSpreadsheet } from 'google-spreadsheet'

function App({ spreadsheetId, auth }) {
    const [docLoaded, setDocLoaded] = React.useState(false);
    const params = useParams();

    const spreadsheetDoc = React.useMemo(() => {
        return new GoogleSpreadsheet(spreadsheetId, auth);
    }, [spreadsheetId, auth]);

    React.useEffect(() => {
        const loadDoc = async () => {
            await spreadsheetDoc.loadInfo(); // loads document properties and worksheets
            console.log(spreadsheetDoc.title);
            setDocLoaded(true);
        }
        loadDoc();
    }, [spreadsheetDoc])

    const [currentThemeSheet, currentResponseSheet, allResponseSheet] = React.useMemo(() => {
        if (docLoaded) {
            const sanitizedName = params.groupId.charAt(0).toUpperCase() + params.groupId.slice(1).toLowerCase();
            return [
                spreadsheetDoc.sheetsByTitle[`CurrentTheme${sanitizedName}`],
                spreadsheetDoc.sheetsByTitle[`CurrentResponses${sanitizedName}`],
                spreadsheetDoc.sheetsByTitle[`AllResponses${sanitizedName}`]
            ]

        }
        return [null, null, null];
    }, [params.groupId, spreadsheetDoc, docLoaded])

    React.useEffect(() => {
        if (currentThemeSheet) {
            console.log(currentThemeSheet.rowCount);

        }
    }, [currentThemeSheet])

    React.useEffect(() => {
        if (params.groupId) {
            console.log(params.groupId);
        }
    }, [params.groupId])

    return (
        <div className="app">
            <div className="runner">
                Hello World
            </div>
        </div>
    );

};


export default App;