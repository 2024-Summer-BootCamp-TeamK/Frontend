import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContractMainById, getContractToxinById } from "../services/contractService";
import { getTaskStatusById } from "../services/taskService";
import LoadingTemp from "../components/LoadingTemp";

const ContractDetails = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [mainTaskId, setMainTaskId] = useState(null);
  const [toxinTaskId, setToxinTaskId] = useState(null);
  const [contractMain, setContractMain] = useState(null);
  const [contractToxin, setContractToxin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const mainTask = await getContractMainById(contractId);
        setMainTaskId(mainTask.task_id);

        const toxinTask = await getContractToxinById(contractId);
        setToxinTaskId(toxinTask.task_id);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchContractDetails();
  }, [contractId]);

  useEffect(() => {
    const checkTaskStatus = async () => {
      try {
        if (mainTaskId && !contractMain) {
          const status = await getTaskStatusById(mainTaskId);
          if (status.status === "SUCCESS") {
            setContractMain(status.result);
          }
        }

        if (toxinTaskId && !contractToxin) {
          const status = await getTaskStatusById(toxinTaskId);
          if (status.status === "SUCCESS") {
            setContractToxin(status.result);
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const intervalId = setInterval(checkTaskStatus, 5000);

    return () => clearInterval(intervalId);
  }, [mainTaskId, toxinTaskId, contractMain, contractToxin]);

  useEffect(() => {
    if (contractMain && contractToxin) {
      navigate("/reviewresult", { state: {contractId, contractMain, contractToxin } });
    }
  }, [contractMain, contractToxin, navigate, contractId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!contractMain || !contractToxin) {
    return <LoadingTemp />;
  }

  return null;
};

export default ContractDetails;
