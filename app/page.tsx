import SubjectList from '../components/SubjectList';

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">StudySense</h1>
      <SubjectList />
    </div>
  );
}