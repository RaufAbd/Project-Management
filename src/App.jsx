import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(taskName) {
    setProjectState((prevState) => {
      const newTask = {
        text: taskName,
        id: Math.random(),
        projectId: prevState.selectedProjectId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(task_id) {
    setProjectState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter(({ id }) => id !== task_id),
    }));
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => ({ ...prevState, selectedProjectId: id }));
  }

  function handleStartAddProject() {
    setProjectState((prevState) => ({ ...prevState, selectedProjectId: null }));
  }

  function handleStopAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeletingProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        ({ id }) => id !== prevState.selectedProjectId
      ),
    }));
  }

  const selectedProject = projectState.projects.find(
    ({ id }) => id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeletingProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onSaveProject={handleAddProject}
        onClose={handleStopAddProject}
      />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        projects={projectState.projects}
        onStartAddProject={handleStartAddProject}
        selectedProjectId={projectState.selectedProjectId}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
