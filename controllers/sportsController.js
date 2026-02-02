import fs from "fs";

const sports = JSON.parse(fs.readFileSync("./data/sportsData.json"));

export const getALLSports = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: sports,
  });
};

export const getSportByID = (req, res) => {
  const { id } = req.params;

  const sport = sports.find((sport) => sport.id === +id);
  if (!sport) {
    res.status(404).json({
      status: "fail",
      message: "Invalid sport ID",
    });
    return;
  }
  res.status(200).json({
    status: "success",
    data: sport,
  });
};

export const createSport = (req, res) => {
  const newID =
    sports.length > 0 ? Number(sports[sports.length - 1].id) + 1 : 1;

  const newSport = {
    id: String(newID),
    ...req.body,
    playres: [],
  };
  sports.push(newSport);

  try {
    fs.writeFileSync("./data/sportsData.json", JSON.stringify(sports, null, 2));

    res.status(200).json({
      status: "success",
      data: newSport,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Can not add new sport" + err.message,
    });
  }
};
export const updateSport = (req, res) => {
  const { id } = req.params;

  const index = sports.findIndex((s) => s.id === +id);

  if (index === -1) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
    return;
  }

  sports[index] = { ...sports[index], ...req.body };
  try {
    fs.writeFileSync("./data/sportsData.json", JSON.stringify(sports, null, 2));

    res.status(200).json({
      status: "success",
      data: sports[index],
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Error writing file: " + err.message,
    });
  }
};

export const deleteSport = (req, res) => {
  const { id } = req.params;

  const sportExists = sports.some((s) => s.id === +id);
  if (!sportExists) {
    res.status(404).json({ status: "fail", message: "ID not found" });
    return;
  }

  const sportsFiltered = sports.filter((s) => s.id !== +id);

  try {
    fs.writeFileSync(
      "./data/sportsData.json",
      JSON.stringify(sportsFiltered, null, 2),
    );

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

export const getPlayersBySport = (req, res) => {
  const { id } = req.params;
  const sport = sports.find((s) => s.id === +id);

  if (!sport) {
    res.status(404).json({
      status: "fail",
      message: "Sport not found",
    });
    return;
  }
  res.status(200).json({
    status: "suceess",
    data: sport.playres,
  });
};
