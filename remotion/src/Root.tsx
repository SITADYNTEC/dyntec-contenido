import { Composition } from "remotion";
import { ReelReservas, RESERVAS_DURATION } from "./ReelReservas";
import { ReelSenales, SENALES_DURATION } from "./ReelSenales";
import "./brand";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="S2-R2-Reservas" component={ReelReservas} durationInFrames={RESERVAS_DURATION} fps={30} width={1080} height={1920} />
      <Composition id="S2-R7-Senales" component={ReelSenales} durationInFrames={SENALES_DURATION} fps={30} width={1080} height={1920} />
    </>
  );
};
