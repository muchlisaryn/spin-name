import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";
import { Button } from "./components/ui/button";
import MonitorLayout from "./layout/MonitorLayout";
import { Input } from "./components/ui/input";
import {
  AlignLeftIcon,
  ChevronLeftIcon,
  PanelLeftClose,
  PlayIcon,
  Repeat1Icon,
  SaveIcon,
  SkipBackIcon,
  StopCircleIcon,
} from "lucide-react";
import Card from "./components/ui/card";
import { Label } from "./components/ui/label";

function App() {
  // const { width, height } = useWindowSize();

  const names = ["Ucup", "Budi", "titi", "taga", "bros", "firman", "tits"];

  const [settings, setSettings] = useState({
    count: 1,
    prize: "",
  });

  console.log(settings);

  const [name, setName] = useState(names[0]);
  const [winner, setwinner] = useState([]);
  const [isRendering, setIsRendering] = useState(false);

  const getRandomNames = (count) => {
    const shuffled = [...names].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (isRendering) {
      const i = setInterval(() => {
        setName(names[Math.floor(Math.random() * names.length)]);
      }, 10);
      return () => clearInterval(i);
    } else {
    }
  }, [isRendering]);

  const stop = () => {
    const winners = getRandomNames(settings.count);
    setIsRendering(false);
    setwinner(winners);
  };

  const playRendering = () => {
    setIsRendering(!isRendering);
  };

  const handleSave = () => {
    setwinner([]);
    setName(names[0]);
  };

  return (
    <MonitorLayout>
      <section className="grid w-1/4 gap-4 border p-4 px-8 rounded">
        {winner.length > 0 || isRendering ? (
          <Input value="Mobil" disabled="true" />
        ) : (
          <>
            <div className="grid gap-2 ">
              <Label>Jumlah Pemenang</Label>
              <Input
                placeholder="Count"
                name="count"
                type="number"
                min="1"
                max={names.length}
                onChange={(e) =>
                  setSettings({ ...settings, count: e.target.value })
                }
                value={settings.count}
                disabled={isRendering}
              />
            </div>
            <div className="grid gap-2">
              <Label>Hadiah</Label>
              <select>
                <option>test 1</option>
              </select>
            </div>
          </>
        )}
      </section>

      {isRendering ? (
        <>
          <div className="flex flex-row gap-2">
            {Array.from({ length: settings.count }).map((_, index) => (
              <Card title={name} />
            ))}
          </div>
          <Button variant="destructive" onClick={stop}>
            <StopCircleIcon />
            Stop
          </Button>
        </>
      ) : (
        <>
          {winner.length > 0 ? (
            <>
              <Confetti />
              <div className="flex gap-4">
                {winner.map((item) => (
                  <Card title={item} variant="winners" />
                ))}
              </div>
            </>
          ) : (
            <></>
          )}

          {winner.length > 0 ? (
            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleSave}>
                <ChevronLeftIcon />
                Cancel
              </Button>
              <Button variant="outline" size="lg" onClick={playRendering}>
                <Repeat1Icon />
                Repeats
              </Button>
              <Button variant="default" size="lg" onClick={handleSave}>
                <SaveIcon />
                Save
              </Button>
            </div>
          ) : (
            <Button variant="default" size="lg" onClick={playRendering}>
              <PlayIcon />
              Play
            </Button>
          )}
        </>
      )}
    </MonitorLayout>
  );
}

export default App;
