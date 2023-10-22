import { useNavigate } from "react-router";
import { Container, Table, Button, Card, Alert } from "react-bootstrap";
import PathConstants from "../../../constants/pathConstants";
import { useQuery } from "@apollo/client";
import { GET_ALL_SALARY_TYPES } from "../../../graphql/employees";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

const SalaryTypes = () => {
  const navigate = useNavigate();
  const { loading, data, error, refetch } = useQuery(GET_ALL_SALARY_TYPES);
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Skeleton count={20} />;
  if (error) return <Alert variant="danger">Error fetching data</Alert>;
  return (
    <Container>
      <div className="title d-flex justify-content-between pe-2">
        <h3>Salary Types</h3>
        <Button variant="success" size="sm" onClick={() => navigate("/" + PathConstants.ADD_SALARY_TYPE)}>
          Add Salary Type
        </Button>
      </div>
      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Basic Salary</th>
                <th>Half Day Salary</th>
                <th>Overtime Salary</th>
                <th>Bonus</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.allSalaryTypes?.length > 0 ? (
                data.allSalaryTypes.map((salaryType, index) => (
                  <tr key={salaryType.id}>
                    <td>{index + 1}</td>
                    <td>{salaryType.basicSalary}</td>
                    <td>{salaryType.halfDaySalary}</td>
                    <td>{salaryType.overTimeSalary}</td>
                    <td>{salaryType.bonus}</td>
                    <td className="text-center">
                      <Button
                        variant="info"
                        size="sm"
                        className="mx-1"
                        onClick={() => navigate(`/${PathConstants.EDIT_SALARY_TYPE}/${salaryType.id}`, { state: { salaryType } })}
                      >
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" className="mx-1">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No salary types found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SalaryTypes;
