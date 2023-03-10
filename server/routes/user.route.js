import  express  from "express";
import { body } from "express-validator";
import {   register,logIn,updateUserRole} from "../controllers/user.js";
import Users from "../modals/user.js";
import user from "../modals/user.js";
import {sendemail} from "../middlewares/emailinvitation.js";
import { addProject,addContributorToProject} from "../controllers/contributor.js";

import multer from 'multer';
import { deleteProject, getUserPojects, getUserRole } from "../controllers/projet.js";

const router = express.Router();


/////////////////////////////////User
 router.route('/register').post(
    body('username').isLength({ min: 3}),
    body('email').isEmail(),
    body('password').isLength({ min: 3}),
    register); 

    router.route('/login').post(logIn);
        
 ////////////////////////////////////////////
    router.route('/project/addProject/').post(
        body('user'),
        body('name'),
        body('releaseType'),
        body('opSystem'),
        body('platform'),
        body('contributors'),addProject); 

       router.route('/addcontributortoproject/:Project').post(
        body('email'),
        body('role'),
        addContributorToProject)

  router.route('/emailinvitation/:Project').post(sendemail);
  router.route('/updateuserrole').put(updateUserRole);

  ////////////////////////////////////

  router.route('/myProjects/:user')
        .get(getUserPojects)


 router.route('/myRole/:project/:user')
        .get(getUserRole)


 router.route('/deleteProject/:_id')
        .delete(deleteProject)       

export default router;
