import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import specAgentRouter from "./spec-agent";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(specAgentRouter);

export default router;
