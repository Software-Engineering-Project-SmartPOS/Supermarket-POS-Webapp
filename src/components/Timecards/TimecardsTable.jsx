import { Card, Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../../constants/pathConstants";
const TimecardsTable = ({ timecards }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card border="light" className="table-responsive shadow">
        <Card.Body className="pt-0">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Employee Name</th>
                <th>Store</th>
                <th>Total Hours Worked</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {timecards.map((timecard) => {
                return (
                  <tr key={timecard.id}>
                    <td>{timecard.clockIn}</td>
                    <td>{timecard.clockOut}</td>
                    <td>{timecard.employeeName}</td>
                    <td>{timecard.store}</td>
                    <td>{timecard.totalHours}</td>
                    <td className="text-center">
                      <Button variant="info" size="sm" className="mx-1" onClick={() => navigate("/" + PathConstants.EDIT_TIMECARD)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" className="mx-1">
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TimecardsTable;
