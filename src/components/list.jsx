import logo from "../assets/logo.svg";
import ListItem from "./listItem";
import styles from "../styles/searchDaycareCenter.module.scss";
import useStore from "../hooks/store";

const List = ({
  listToRender,
  isStationView,
  selectedItemId,
  handleItemSingleClick,
  handleCenterDoubleClick,
  searchDaycareCenter,
  style,
}) => {
  // 스타일 유지 위해 더미데이터 추가
  const dummiesNeeded = 5 - listToRender.length;
  const dummyItems = Array.from({ length: dummiesNeeded }, (_, i) => ({
    id: `dummy-${i}`,
    isDummy: true,
  }));
  const combinedList = [...listToRender, ...dummyItems];

  return (
    <div className={styles.list} style={style}>
      {combinedList.map((item) => {
        const key = isStationView ? item.station_name : item.id;
        const id = isStationView ? item.station_name : item.id;
        return (
          <ListItem
            center={item}
            key={key}
            isDummy={item.isDummy}
            isSelected={id === selectedItemId}
            isStation={isStationView}
            onSingleClick={() => handleItemSingleClick(id)}
            onDoubleClick={handleCenterDoubleClick}
          />
        );
      })}
      {listToRender.length === 0 && (
        <div className={styles.empty}>
          <img src={logo} alt="logo" />
          <div className={styles.description}>
            {searchDaycareCenter
              ? "검색 결과가 없어요."
              : "주변에 어린이집이 없어요."}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
