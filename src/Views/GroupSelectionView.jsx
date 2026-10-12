import "./GroupSelectionView.css";
import { Button, Typography } from "@mui/material";

function GroupSelectionView() {

    return (
        <div className="app">
            <div className="runner">
                <div
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                    <Typography textAlign="center" variant="h2">
                        Discipleship Community <span>Meal Signup</span>
                    </Typography>
                    <Typography textAlign="center" variant="h4">
                        Please select your discipleship community:
                    </Typography>
                    <div
                        className="group-buttons"
                    >
                        <Button
                            variant="outlined"
                            color="white"
                            sx={{ width: "30ch", maxWidth: "90vw" }}
                            href="#/sagert"
                        >
                            <Typography textAlign="center" variant="h5">
                                Sagert
                            </Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            color="white"
                            sx={{ width: "30ch", maxWidth: "90vw" }}
                            href="#/greenwood"
                        >
                            <Typography textAlign="center" variant="h5">
                                Greenwood
                            </Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            color="white"
                            sx={{ width: "30ch", maxWidth: "90vw" }}
                            href="#/madrona"
                        >
                            <Typography textAlign="center" variant="h5">
                                Madrona
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </div>);
}

export default GroupSelectionView;