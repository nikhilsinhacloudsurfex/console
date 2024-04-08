import { Stack, px } from '@mantine/core';
import StreamDropdown from '@/components/Header/StreamDropdown';
import IconButton from '@/components/Button/IconButton';
import { useLogsPageContext } from './logsContextProvider';
import { useHeaderContext } from '@/layouts/MainLayout/Context';
import classes from './styles/Toolbar.module.css';
import { IconBolt, IconExclamationCircle, IconSettings, IconTrash } from '@tabler/icons-react';
import { LOGS_PRIMARY_TOOLBAR_HEIGHT } from '@/constants/theme';
import EventTimeLineGraph from './EventTimeLineGraph';

const renderAlertsIcon = () => <IconExclamationCircle size={px('1.4rem')} stroke={1.5} />;
const renderSettingsIcon = () => <IconSettings size={px('1.4rem')} stroke={1.5} />;
const renderLiveTailIcon = () => <IconBolt size={px('1.4rem')} stroke={1.5} />;
const renderDeleteIcon = () => <IconTrash size={px('1.4rem')} stroke={1.5} />;

const PrimaryToolbar = () => {
	const {
		methods: { openDeleteModal, openAlertsModal, openRetentionModal, toggleLiveTail },
		state: { liveTailToggled },
	} = useLogsPageContext();
	const {
		state: { userSpecificAccessMap },
	} = useHeaderContext();
	return (
		<Stack className={classes.logsPrimaryToolbar} style={{ height: LOGS_PRIMARY_TOOLBAR_HEIGHT }}>
			<StreamDropdown />
			<EventTimeLineGraph />
			<Stack gap={0} style={{ flexDirection: 'row', alignItems: 'center', marginRight: '0.675rem' }}>
			<IconButton
						renderIcon={renderLiveTailIcon}
						onClick={toggleLiveTail}
						active={liveTailToggled}
						tooltipLabel="Live Tail"
					/>
				{userSpecificAccessMap.hasUpdateAlertAccess && (
					<IconButton renderIcon={renderAlertsIcon} onClick={openAlertsModal} tooltipLabel="Alerts" />
				)}
				<IconButton renderIcon={renderSettingsIcon} onClick={openRetentionModal} tooltipLabel="Settings" />
				{userSpecificAccessMap.hasDeleteAccess && (
					<IconButton renderIcon={renderDeleteIcon} onClick={openDeleteModal} tooltipLabel="Delete" />
				)}
			</Stack>
		</Stack>
	);
};

export default PrimaryToolbar;
