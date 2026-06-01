import { useState, useEffect, type FormEvent } from "react";
import { Grape, Trash2, Plus, X, Check, Info } from "lucide-react";

type TGrapeBoard = boolean[];

type TMember = {
  id: number;
  name: string;
  currentBoardIndex: number;
  boards: TGrapeBoard[];
};

const initialMembers: TMember[] = [
  {
    id: 1,
    name: "김예본",
    currentBoardIndex: 0,
    boards: [Array(30).fill(false)],
  },
  {
    id: 2,
    name: "이세희",
    currentBoardIndex: 0,
    boards: [Array(30).fill(false)],
  },
];

export default function GrapeCoupon() {
  const [members, setMembers] = useState<TMember[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("grape_app_data");
      return saved ? JSON.parse(saved) : initialMembers;
    }
    return initialMembers;
  });

  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(
    members[0]?.id ?? null,
  );
  const [isEditingNames, setIsEditingNames] = useState(false);
  const [newNameInput, setNewNameInput] = useState("");

  useEffect(() => {
    localStorage.setItem("grape_app_data", JSON.stringify(members));
  }, [members]);

  const currentMember = members.find((m) => m.id === selectedMemberId);

  const handleGrapeClick = (boardIndex: number, grapeIndex: number) => {
    setMembers((prev) =>
      prev.map((member) => {
        if (member.id !== selectedMemberId) return member;

        const newBoards = [...member.boards];
        newBoards[boardIndex] = [...newBoards[boardIndex]];
        newBoards[boardIndex][grapeIndex] = !newBoards[boardIndex][grapeIndex];

        return { ...member, boards: newBoards };
      }),
    );
  };

  const handleAddBoard = () => {
    setMembers((prev) =>
      prev.map((member) => {
        if (member.id !== selectedMemberId) return member;
        return {
          ...member,
          boards: [...member.boards, Array(30).fill(false)],
          currentBoardIndex: member.boards.length,
        };
      }),
    );
  };

  const handleSwitchBoard = (index: number) => {
    setMembers((prev) =>
      prev.map((member) => {
        if (member.id !== selectedMemberId) return member;
        return { ...member, currentBoardIndex: index };
      }),
    );
  };

  const handleDeleteBoard = (index: number) => {
    if (!currentMember || currentMember.boards.length <= 1) return;
    if (
      !window.confirm(
        "이 판을 정말 삭제할까요? 채워진 포도알이 모두 사라집니다.",
      )
    )
      return;

    setMembers((prev) =>
      prev.map((member) => {
        if (member.id !== selectedMemberId) return member;
        const newBoards = member.boards.filter((_, i) => i !== index);
        let newIdx = member.currentBoardIndex;
        if (newIdx >= newBoards.length) newIdx = newBoards.length - 1;
        return { ...member, boards: newBoards, currentBoardIndex: newIdx };
      }),
    );
  };

  const handleUpdateName = (id: number, newName: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name: newName } : m)),
    );
  };

  const handleAddMember = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newNameInput.trim()) return;
    const newMember = {
      id: Date.now(),
      name: newNameInput.trim(),
      currentBoardIndex: 0,
      boards: [Array(30).fill(false)],
    };
    setMembers((prev) => [...prev, newMember]);
    setSelectedMemberId(newMember.id);
    setNewNameInput("");
  };

  const handleDeleteMember = (id: number) => {
    if (members.length <= 1) {
      alert("최소 한 명의 이름은 있어야 합니다.");
      return;
    }
    if (
      !window.confirm(
        "이 사용자를 삭제하시겠습니까? 모든 포도판 데이터가 지워집니다.",
      )
    )
      return;

    const filtered = members.filter((m) => m.id !== id);
    setMembers(filtered);
    if (selectedMemberId === id) {
      setSelectedMemberId(filtered[0].id);
    }
  };

  if (!currentMember)
    return (
      <div className="text-center p-8 text-xl">데이터를 불러오는 중...</div>
    );

  const activeBoardIndex = currentMember.currentBoardIndex;
  const activeBoard =
    currentMember.boards[activeBoardIndex] || currentMember.boards[0];
  const completedGrapes = activeBoard.filter((g) => g).length;

  return (
    <div className="w-full max-w-md mx-auto my-8 p-4">
      <div className="bg-white rounded-3xl shadow-xl border-4 border-purple-200 p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 bg-purple-400" />

        <div className="mt-2 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-black text-purple-600 flex items-center gap-2">
              <Grape className="text-purple-500 fill-purple-200" size={28} />{" "}
              칭찬 포도알 스탬프
            </h1>
            <button
              onClick={() => setIsEditingNames(!isEditingNames)}
              className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors ${
                isEditingNames
                  ? "bg-purple-500 text-white"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
            >
              {isEditingNames ? "편집 완료" : "이름 관리"}
            </button>
          </div>

          {isEditingNames ? (
            <div className="bg-purple-50 p-4 rounded-2xl border-2 border-dashed border-purple-300 space-y-3">
              <p className="text-xs text-purple-700 font-bold flex items-center gap-1">
                <Info size={14} /> 이름을 수정하거나 새로운 멤버를 추가하세요.
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {members.map((m) => (
                  <div key={m.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) => handleUpdateName(m.id, e.target.value)}
                      className="flex-1 px-3 py-1 border-2 border-purple-200 rounded-xl font-bold text-gray-700 focus:outline-none focus:border-purple-400"
                    />
                    <button
                      onClick={() => handleDeleteMember(m.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-xl"
                      title="이름 삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleAddMember}
                className="flex gap-2 pt-2 border-t border-purple-200"
              >
                <input
                  type="text"
                  placeholder="새 이름 추가..."
                  value={newNameInput}
                  onChange={(e) => setNewNameInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 border-2 border-purple-200 rounded-xl text-sm font-bold focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-1.5 rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors shrink-0"
                >
                  추가
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-2xl">
              <label className="text-lg font-bold text-purple-700 shrink-0">
                누구의 포도판?
              </label>
              <select
                value={selectedMemberId ?? undefined}
                onChange={(e) => setSelectedMemberId(Number(e.target.value))}
                className="w-full bg-white border-2 border-purple-200 rounded-xl px-3 py-1.5 font-bold text-purple-900 focus:outline-none focus:border-purple-400 cursor-pointer"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2">
          {currentMember.boards.map((_, idx) => (
            <div key={idx} className="flex items-center shrink-0">
              <button
                onClick={() => handleSwitchBoard(idx)}
                className={`px-4 py-1.5 rounded-xl font-bold text-sm transition-all ${
                  idx === activeBoardIndex
                    ? "bg-purple-600 text-white shadow-md transform -translate-y-0.5"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {idx + 1}번째 판
              </button>
              {currentMember.boards.length > 1 && idx === activeBoardIndex && (
                <button
                  onClick={() => handleDeleteBoard(idx)}
                  className="text-red-400 hover:text-red-600 ml-1 p-1"
                  title="현재 판 삭제"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleAddBoard}
            className="px-3 py-1.5 border-2 border-dashed border-purple-300 rounded-xl font-bold text-xs text-purple-600 hover:bg-purple-50 shrink-0 flex items-center gap-1"
          >
            <Plus size={12} /> 판 추가
          </button>
        </div>

        <div className="flex justify-between items-end mb-4 px-1">
          <span className="text-sm font-bold text-gray-500">
            🍇 터치해서 포도알을 채워요!
          </span>
          <span className="text-xl font-bold text-purple-600 bg-purple-50 px-3 py-0.5 rounded-full">
            {completedGrapes} / 30
          </span>
        </div>

        <div className="bg-purple-50/60 border-2 border-purple-100 rounded-3xl p-6 mb-4">
          <div className="grid grid-cols-6 gap-3">
            {activeBoard.map((isFilled, idx) => (
              <button
                key={idx}
                onClick={() => handleGrapeClick(activeBoardIndex, idx)}
                className={`aspect-square rounded-full flex items-center justify-center relative focus:outline-none transition-all duration-200 transform hover:scale-105 shadow-sm ${
                  isFilled
                    ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-2 border-purple-700 active:scale-95 shadow-purple-300/50"
                    : "bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-300"
                }`}
              >
                {isFilled ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <span className="text-xs font-bold opacity-50">
                    {idx + 1}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {completedGrapes === 30 && (
          <div className="bg-amber-50 border-2 border-amber-300 text-amber-900 text-center p-3 rounded-2xl font-bold text-md animate-bounce my-2">
            🎉 와우! 30개 포도알을 다 모았어요! 🎉
            <button
              onClick={handleAddBoard}
              className="block mx-auto mt-2 text-xs bg-amber-500 text-white px-4 py-1.5 rounded-xl shadow hover:bg-amber-600 transition-colors"
            >
              다음 새로운 판 열기 ➔
            </button>
          </div>
        )}

        <p className="text-center text-[11px] text-gray-400 mt-4">
          * 모든 데이터는 브라우저(LocalStorage)에 자동으로 저장됩니다.
        </p>
      </div>
    </div>
  );
}
