import user from '../modals/user.js';
import project from  '../modals/projet.js'
import contributor from '../modals/contributor.js';
export async function addContributorToProject(req, res){

// Find the user to be added as a contributor

const {Project} = req.params;
const pp = await project.findOne({ Project});

const { email,role} = req.body;
const userToAdd = await user.findOne({ email});

// Check if the user is already a contributor to the project
const existingContributor = await contributor.findOne({
  user: userToAdd._id,
  projects: { $in: [pp._id] },
});

if (existingContributor) {
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

  console.log('User added as a contributor to the project');
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
              contributors : req.body.userId,
         });
         await pro.save();

         const cont = new contributor({ user: pro.user, role: 'Maintainer', projects: pro._id });
         await cont.save();




         res.status(201).send({ message: 'Data saved successfully!' });
    } catch (error) {
         console.error(error);
         res.status(500).send({ message: 'Internal server error' });
    }
}

