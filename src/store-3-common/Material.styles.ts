import { createStyles, makeStyles, Theme } from '@material-ui/core';


export const useStylesApp = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    breadcrumps: { 
      float: 'right',
      marginTop: '10px',
      marginRight: '150px',
      fontSize: '13px',
      backgroundColor: 'rgba(255, 255, 255, 0.541)',
      padding: '10px'
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textTransform: 'uppercase',
      color: 'white'
    },
  }),
);


export const useStylesStore = makeStyles((theme: Theme) =>
    createStyles({
        container_grid: {
            marginLeft: '150px'
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);
