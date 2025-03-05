import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SidebarIcon from '../../assets/SidebarIcon.png'

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const sidebarTexts = ["По проекту", "Объекты", "РД", "МТО", "СМР", 
                        "График", "МиМ", "Рабочие", "Капвложения", "Бюджет", "Финансирование", 
                        "Панорамы", "Камеры", "Поручения", "Контрагенты"]

  return (
    <List
      sx={{ width: '100%', paddingTop: 0, minWidth: '220px'}}
      component="nav"
    >
      <ListItemButton onClick={handleClick}  sx={{borderBottom: '1px #414144 solid'}}>
        <ListItemText primary="Название проекта"/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            sidebarTexts.map(text => (
            <ListItemButton sx={{ pl: 2, }} key={text} selected={text === 'СМР'}>
                <ListItemIcon>
                  <img src={SidebarIcon} alt='SidebarIcon'/>
                </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            ))
          }
        </List>
      </Collapse>
    </List>
  );
}