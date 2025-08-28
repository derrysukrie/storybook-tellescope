import { Badge, Box } from '@mui/material'
import BulbIcon from '../../../assets/bulb.svg'
import BulbActiveIcon from '../../../assets/bulb-active.svg'
import { Page } from '../../atoms/Page/Page'
import { SuggestedAction } from '../../atoms/SuggestedAction/SuggestedAction'

export interface SuggestedActionsProps {
    expanded: boolean
}

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({ expanded = false }) => {
    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '16px',
                maxWidth: '700px',
                overflowX: 'auto',
                paddingBottom: '8px',
            }}
        >
            {!expanded ? (
                <Badge color="error" variant="dot">
                    <img alt="bulb" src={BulbIcon} />
                </Badge>
            ) : (
                <img alt="bulb active" src={BulbActiveIcon} />
            )}

            <Page truncated={true} />

            {expanded && (
                <>
                    <SuggestedAction truncated={true} />
                    <SuggestedAction truncated={true} />
                </>
            )}
        </Box>
    )
}
