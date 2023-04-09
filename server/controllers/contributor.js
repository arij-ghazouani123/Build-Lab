import user from '../modals/user.js';
import project from '../modals/projet.js'
import contributor from '../modals/contributor.js';
/////////////////////////////////////////
import mixpanel from 'mixpanel';
// create an instance of the mixpanel client
var Mixpanel = mixpanel.init('24382e06ab44f0ebb6a5e1913b4d5862');

///////////////////////////////////////


//////////////////////////////////////////////////////////
export async function addContributorToProject(req, res) {

  // Find the user to be added as a contributor
  try {
    const { Project } = req.params;
    const pp = await project.findOne({ Project });

    const { email, role } = req.body;
    const userToAdd = await user.findOne({ email });

    // Check if the user is already a contributor to the project
    const existingContributor = await contributor.findOne({
      user: userToAdd._id,
      projects: { $in: [pp._id] },
    });

    if (existingContributor) {
      Mixpanel.track('Contributor Exist', {
        Contributor_email: email,
        Contributor_role: role,

      });
      console.log('User is already a contributor to the project');
    } else {
      // Create a new contributor for the user and add them to the project's list of contributors
      const newContributor = new contributor({
        role: role,
        user: userToAdd._id,
        projects: [pp._id],
      });
      await newContributor.save();
      pp.contributors.push(newContributor._id);
      await pp.save();
      Mixpanel.track('Contributor Added', {
        new_User_ID: userToAdd._id,
        new_Contributor_role: role,
        Project_Added_to: pp._id

      });
      console.log('User added as a contributor to the project');
    }
  } catch (error) {
    Mixpanel.track('App Crashed', { error: error });
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}

//////////////////////////////////////////////////////////


export async function addProject(req, res) {

  try {
    let pro = new project({
      user: req.body.userId,
      name: req.body.name,
      releaseType: req.body.releaseType,
      opSystem: req.body.opSystem,
      platform: req.body.platform,
      contributors: req.body.userId,
    });
    await pro.save();

    const cont = new contributor({ user: pro.user, role: 'Maintainer', projects: pro._id });
    await cont.save();

    Mixpanel.track('New Project Added', {
      User_ID: pro._id,
      Project_Name: pro.name,
      Project_releaseType: pro.releaseType,
      Project_opSystem: pro.opSystem,
      Project_platform: pro.platform,
      Project_contributors: pro.contributors

    });


    res.status(201).send({ message: 'Data saved successfully!' });
  } catch (error) {
    Mixpanel.track('App Crashed', { error: error });
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}


//////////////////////////////////////////////////////////

export async function DeleteContributor(req, res) {
  const projectId = req.params._id1;
  const contributorId = req.params._id2;
  const deleterContributorId = req.params._id3;
  // Get the project
  const Project = await project.findById(projectId);

  // Get the contributor who is deleting and check if they are a maintainer
  const deleterContributor = await contributor.findById(deleterContributorId);
  const isDeleterMaintainer = deleterContributor.role === 'Maintainer';

  // If the deleter is not a maintainer, throw an error
  if (!isDeleterMaintainer) {
    throw new Error('Only Maintainers can remove contributors from a project');
  }

  // Get the contributor to be deleted
  const Contributor = await contributor.findById(contributorId);

  // Remove the contributor from the project
  await contributor.findByIdAndDelete(contributorId);

  // Remove the project reference from the contributor
  await contributor.findByIdAndUpdate(contributorId, {
    $pull: { projects: projectId },
  });

  // Remove the contributor reference from the project
  await project.findByIdAndUpdate(projectId, {
    $pull: { contributors: contributorId },
  });
};