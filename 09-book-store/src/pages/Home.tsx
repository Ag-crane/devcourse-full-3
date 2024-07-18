import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import Title from "../components/common/Title";

const Home = () => {
    return (
        <>
            <div>Home body</div>
            <Title size="large" color="background">
                제목 테스트
            </Title>
            <Button size="large" scheme="primary">
                버튼 테스트
            </Button>
            <InputText placeholder="입력해주세요" />
        </>
    );
};

export default Home;
