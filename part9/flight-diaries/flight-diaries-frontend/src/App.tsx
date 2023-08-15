import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { DiaryEntry } from "./types";

import diaryService from "./services/diaries";
import DiaryList from "./components/DiaryList";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      console.log("Diaries from App", diaries);

      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Flight diaries
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={<DiaryList diaries={diaries} setDiaries={setDiaries} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
