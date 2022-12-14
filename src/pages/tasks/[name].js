import { Box, Popover } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Topics } from "../../components/quests/topics"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Filter from "../../components/quests/filter";
import { GetContext } from "../../contexts/getFirebaseContext";

const Tasks = () => {
  const router = useRouter()
  const loaded = false
  const [questions, setQuestions] = useState(null)

  const getContext = useContext(GetContext);

  function allQuestions() {
    getContext.getQuestions(router.query.name).then((value) =>
      setQuestions(value)
    ).catch(console.error)
  }

  useEffect(() => {
    if (loaded) {
      return
    }
    allQuestions();
    loaded = true
  }, [router.query.name]);

  const [isTopicsOpen, setTopicsOpen] = useState(null)
  const [isFilterOpen, setFilterOpen] = useState(null)

  const topicsClick = (event) => {
    setTopicsOpen(event.currentTarget);
  };

  const topicsClose = () => {
    setTopicsOpen(null);
  };

  const filterClick = (event) => {
    setFilterOpen(event.currentTarget);
  };

  const filterClose = () => {
    setFilterOpen(null);
  };


  const openTopics = Boolean(isTopicsOpen);
  const openFilter = Boolean(isFilterOpen);
  const topics = openTopics ? 'simple-popover' : undefined;
  const filter = openFilter ? 'simple-popover' : undefined;

  if (questions) {
    return (
      <>
        <Head>
          <title>
            {router.query.name}
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Box className="bg-[#1F2937] w-full p-4 px-6">
            <div className="text-[18px] md:text-[25px] lg:text-[1.7rem] font-semibold text-white flex justify-between">
              <button aria-describedby={topics}
                onClick={topicsClick}
                className="hover:text-green-500">
                {router.query.name}
                <ExpandMoreIcon fontSize="20" />
              </button>
              <Popover
                id={topics}
                open={openTopics}
                anchorEl={isTopicsOpen}
                onClose={topicsClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Topics />
              </Popover>

              <button
                className="text-[15px]  text-[#21a87b] border border-[#3FC79A] px-2 lg:hidden rounded hover:bg-[#21a87b] hover:text-[#1F2937]"
                aria-describedby={filter}
                onClick={filterClick} >
                Filtro
              </button>
              <Popover
                id={filter}
                open={openFilter}
                anchorEl={isFilterOpen}
                onClose={filterClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <div className="mt-1 mb-1">
                  <Filter />
                </div>

              </Popover>

            </div>
          </Box>

          <div className="px-6">
            <Box className="w-full flex flex-col lg:flex-row pt-5 justify-between gap-4 h-full">
              <div className="lg:w-[80%]">

                {questions["questions"].map((question) => ( //Pega os dados de questions.json e faz uma box para cada quest??o
                  <Link href={`/questions/${question.titulo}`}
                    key={question.titulo}>
                    <div className="pb-3">
                      <Box className="group">
                        <button className="p-4 border mb-3 border-gray-500 group-hover:border-green-500 w-full rounded">
                          <Box className="font-semibold">
                            <Box className="p-2">
                              <div className="group-hover:text-green-500 flex text-[20px]">
                                {question.titulo}
                              </div>
                              <div className="text-[16px] flex">
                                <div className="flex">
                                  <div>N??vel:&nbsp;</div>
                                  <div className="text-green-500">{question.dificuldade}</div>
                                </div>
                                <div>
                                  , Taxa de Acerto: {question.taxaSucesso}
                                </div>
                              </div>
                            </Box>
                          </Box>
                          <Box className="font-semibold block lg:justify-between lg:flex lg:items-center w-full">
                            <Box className="text-left text-gray-400 p-2 lg:w-[60%]">
                              {question.descricao}
                            </Box>

                            <Box className="p-3 m-2 lg:m-0 border border-gray-300 bg-[#111827] group-hover:bg-green-500 group-hover:border-green-500 text-gray-300 group-hover:text-[#1F2937] rounded-lg lg:w-[20%] ">
                              Resolver Desafio
                            </Box>
                          </Box>
                        </button>
                      </Box>
                    </div>
                  </Link>
                ))}
              </div>
              <Box className="w-[20%] lg:flex flex-col hidden">
                <Filter />
              </Box>

            </Box>
          </div>

        </Box>
      </>
    )
  } return <div className="flex justify-center p-4"><span className="loader"></span></div>
}

Tasks.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Tasks;