import { useEffect } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { GrInProgress } from 'react-icons/gr';
import { IoCloudDoneSharp } from 'react-icons/io5';
import { MdCancel, MdOutlinePendingActions } from 'react-icons/md';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import Card from '../../components/Card';
import HomeLayout from '../../layouts/HomeLayout';
import { getAllTickets } from '../../redux/slices/TicketSlice';
import { AppDispatch, RootState } from '../../redux/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Home: React.FC = () => {
  const authState = useTypedSelector((state) => state.auth);
  const ticketState = useTypedSelector((state) => state.tickets);
  const dispatch = useDispatch<AppDispatch>();

  async function loadTickets() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await dispatch(getAllTickets());
  }

  useEffect(() => {
    loadTickets();
  }, [authState.token]);
  return (
    <HomeLayout>
      <div className="mt-10 flex flex-wrap justify-center items-center gap-6">
        <Card
          titleText='Open'
          background="bg-yellow-300"
          status={ticketState.ticketDistribution.open / ticketState.ticketList.length}
          quantity={ticketState.ticketDistribution.open}
          borderColor="border-green-500"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <FaPencil className="inline mr-2" />
        </Card>

        <Card
          titleText="In Progress"
          background="bg-blue-300"
          status={ticketState.ticketDistribution.inProgress / ticketState.ticketList.length}
          quantity={ticketState.ticketDistribution.inProgress}
          borderColor="border-pink-700"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <GrInProgress className="inline mr-2" />
        </Card>

        <Card
          titleText='Resolved'
          background="bg-purple-300"
          status={ticketState.ticketDistribution.resolved / ticketState.ticketList.length}
          quantity={ticketState.ticketDistribution.resolved}
          borderColor="border-blue-500"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <IoCloudDoneSharp className="inline mr-2" />
        </Card>

        <Card
          titleText='On Hold'
          background="bg-green-300"
          status={ticketState.ticketDistribution.onHold / ticketState.ticketList.length}
          quantity={ticketState.ticketDistribution.onHold}
          borderColor="border-yellow-500"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <MdOutlinePendingActions className="inline mr-2" />
        </Card>

        <Card
          titleText='Cancelled'
          background="bg-pink-500"
          status={ticketState.ticketDistribution.cancelled / ticketState.ticketList.length}
          quantity={ticketState.ticketDistribution.cancelled}
          borderColor="border-purple-900"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <MdCancel className="inline mr-2" />
        </Card>
      </div>
    </HomeLayout>
  );
};

export default Home;
