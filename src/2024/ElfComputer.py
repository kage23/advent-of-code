class ElfComputer:
  def __init__(self, a=0, b=0, c=0):
    self.registers = {
      "a": a,
      "b": b,
      "c": c
    }
    self.operations = [
      self.adv,
      self.bxl,
      self.bst,
      self.jnz,
      self.bxc,
      self.out,
      self.bdv,
      self.cdv,
    ]
    self.output = []
    self.instruction_pointer = 0
    self.program = []

  def get_combo_operand(self, n):
    if n <= 3:
      return n
    if n == 4:
      return self.registers["a"]
    if n == 5:
      return self.registers["b"]
    if n == 6:
      return self.registers["c"]

  def adv(self):
    operand = self.get_combo_operand(self.program[self.instruction_pointer + 1])
    numerator = self.registers["a"]
    denominator = 2 ** operand
    self.registers["a"] = int(numerator / denominator)
    self.instruction_pointer += 2

  def bxl(self):
    operand = self.program[self.instruction_pointer + 1]
    self.registers["b"] = self.registers["b"] ^ operand
    self.instruction_pointer += 2

  def bst(self):
    operand = self.get_combo_operand(self.program[self.instruction_pointer + 1])
    self.registers["b"] = operand % 8
    self.instruction_pointer += 2

  def jnz(self):
    operand = self.program[self.instruction_pointer + 1]
    if self.registers["a"] == 0:
      self.instruction_pointer += 2
    else:
      self.instruction_pointer = operand

  def bxc(self):
    self.registers["b"] = self.registers["b"] ^ self.registers["c"]
    self.instruction_pointer += 2

  def out(self):
    operand = self.get_combo_operand(self.program[self.instruction_pointer + 1])
    self.output.append(operand % 8)
    self.instruction_pointer += 2

  def bdv(self):
    operand = self.get_combo_operand(self.program[self.instruction_pointer + 1])
    numerator = self.registers["a"]
    denominator = 2 ** operand
    self.registers["b"] = int(numerator / denominator)
    self.instruction_pointer += 2

  def cdv(self):
    operand = self.get_combo_operand(self.program[self.instruction_pointer + 1])
    numerator = self.registers["a"]
    denominator = 2 ** operand
    self.registers["c"] = int(numerator / denominator)
    self.instruction_pointer += 2

  def run_program(self, program):
    self.program = program
    while self.instruction_pointer < len(self.program):
      opcode = self.program[self.instruction_pointer]
      self.operations[opcode]()
    return ",".join(map(str, self.output))