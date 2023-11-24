import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LangSwitch: React.FC = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="RU" />
      </SelectTrigger>
      <SelectContent
        className="min-w-0"
        dir="rtl"
        defaultChecked={true}
        defaultValue="ru"
      >
        <SelectGroup>
          <SelectItem value="ru">RU</SelectItem>
          <SelectItem value="kk">KK</SelectItem>
          <SelectItem value="en">EN</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LangSwitch;
