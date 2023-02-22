<<<<<<< HEAD
import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import {
  getProfessionById,
  getProfessionsLoadingStatus
} from "../../store/profession"

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus())
  const prof = useSelector(getProfessionById(id))
  if (!isLoading) {
    return <p>{prof.name}</p>
  } else return "Loading..."
}
Profession.propTypes = {
  id: PropTypes.string
}
export default Profession
=======
import React from "react";
import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
>>>>>>> 8f585a6ad783ff5c8179c7b04876d953e6c27ef1
