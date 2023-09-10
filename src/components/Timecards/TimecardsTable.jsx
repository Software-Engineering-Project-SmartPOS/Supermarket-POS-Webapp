import { Card, Container, Table } from "react-bootstrap";
const TimecardsTable = ({ timecards }) => {
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
