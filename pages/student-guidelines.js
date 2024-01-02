import Link from 'next/link';
import MainLayout from '../components/Layouts/MainLayout';

const StudentGuidelines = () => {
  return <MainLayout
    header="General Student Guidelines"
  >
    <div className="container">
      <p>To register please visit <Link href="/">Student Registration</Link> page.</p>
    </div>
    <div className='container'>
      <p>Christian Student Convention is for full-time students who attend your church school or who are home-schooled and attend your church faithfully.</p>

      <p>Those who are 12 years old or in grade 7 on the Convention dates may attend. Students who are younger than 12 may not enter even if they are in grade 7.</p>

      <p>Graduating students who may have completed their academic work already in the current school year are eligible.</p>

      <p>A student may enter a maximum of 9 participation events EXCLUDING those events finished before Convention (needlework, sketching, etc.).</p>

      <p><strong>A participant must enter a minimum of 3 events.</strong></p>

      <p>Mixing divisions will be allowed for those schools with 25 students or less. Mixing a "B" division student in an "A" division group will require that group to be judged and to participate with the "B" division.</p>

      <p>The following dress code will be enforced for all participants, judges, and sponsors. Failure to follow the dress code will result in lost points when being judged and could result in disqualification as well as embarrassment, so please abide!</p>

      <h5>Males</h5>
      <h6>Platform Events, Meals & Rally</h6>
      <ul>
        <li>Hair off the collar and above the ears - no "mod" or spiked hair</li>
        <li>Button-up shirts and long trousers (no jeans)</li>
        <li>Ties are required at meals and rally. When not wearing a tie, only the top button is to be undone.</li>
        <li>No chains or jewelry is allowed</li>
        <li>Dress shoes</li>
      </ul>

      <h6>Sports</h6>
      <ul>
        <li>Each team member is required to wear a numbered jersey</li>
        <li>Blue jeans and may be worn (no ripped jeans)</li>
        <li>Sweat pants and shorts will not be allowed</li>
      </ul>
    </div>
  </MainLayout>
}

export default StudentGuidelines;