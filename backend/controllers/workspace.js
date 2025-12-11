import Workspace from "../models/workspace.js";

const createWorkspace = async (request, response) => {
  try {
    const { name, description, color } = request.body;

    const workspace = await Workspace.create({
      name,
      description,
      color,
      owner: request.user._id,
      members: [
        {
          user: request.user._id,
          role: "owner",
          joinedAt: new Date(),
        },
      ],
    });

    response.status(201).json(workspace);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
};

const getWorkspaces = async (request, response) => {
  try {
    const workspaces = await Workspace.find({
      "members.user": request.user._id,
    }).sort({ createdAt: -1 });

    response.status(200).json(workspaces);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
};

export { createWorkspace, getWorkspaces };
