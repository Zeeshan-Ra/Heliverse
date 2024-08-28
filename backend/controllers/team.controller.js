import User from "../models/user.model.js";
import Team from "../models/team.model.js";

export const createTeam = async (req, res) => {
  const { memberIds } = req.body;

  try {
    const members = await User.find({ id: { $in: memberIds } });

    const domains = members.map((member) => member.domain);
    const uniqueDomains = [...new Set(domains)];
    const availableMembers = members.filter((member) => member.available);
    const team = {
      members: availableMembers,
      domains: uniqueDomains,
    };
    const teamData = await Team.create(team);
    return res.status(201).json(teamData);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findById(id).populate("members");
    res.status(200).json(team);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({}).populate("members");
    res.status(200).json(teams);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};
