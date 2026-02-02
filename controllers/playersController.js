import fs from "fs";
const sports = JSON.parse(fs.readFileSync("./data/sportsData.json"));

export const addPlayerToSport = (req, res) => {
  const { id } = req.params;
  const sport = sports.find((s) => s.id === +id);
  if (!sport) {
    res.status(404).json({
      status: "fail",
      message: "Sport not found",
    });
    return;
  }
  const newPlayer = {
    id: String(sport.players.length + 1),
    ...req.body,
  };
  sport.players.push(newPlayer);
  try {
    fs.writeFileSync("./data/sportsData.json", JSON.stringify(sports, null, 2));
    res.status(201).json({
      status: "success",
      data: newPlayer,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deletePlayer = (req, res) => {
  const { id, playerId } = req.params;

  const sport = sports.find((s) => s.id === +id);
  if (!sport) {
    return res.status(404).json({ status: "fail", message: "Sport not found" });
  }

  const playerIndex = sport.players.findIndex((p) => p.id === playerId);

  if (playerIndex === -1) {
    return res
      .status(404)
      .json({ status: "fail", message: "Player not found" });
  }

  sport.players.splice(playerIndex, 1);

  try {
    fs.writeFileSync("./data/sportsData.json", JSON.stringify(sports, null, 2));
    res
      .status(204)
      .json({ status: "success", data: null, message: "You deleted player" });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
